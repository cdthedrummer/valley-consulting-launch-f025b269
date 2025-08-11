import React, { useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Radio, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VoiceAgent: React.FC = () => {
  const conversation = useConversation({
    onConnect: () => console.log("ElevenLabs connected"),
    onDisconnect: () => console.log("ElevenLabs disconnected"),
    onError: (e) => console.error("ElevenLabs error", e),
  });

  const { toast } = useToast();
  const [agentId, setAgentId] = useState("");
  const [connecting, setConnecting] = useState(false);

  const requestMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (e) {
      toast({
        title: "Microphone blocked",
        description: "Please allow microphone access to use voice.",
        variant: "destructive",
      });
      return false;
    }
  };

  const start = async () => {
    const ok = await requestMic();
    if (!ok) return;
    try {
      setConnecting(true);
      if (!agentId.trim()) {
        toast({ title: "Enter your ElevenLabs Agent ID" });
        return;
      }

      // Try to get a signed URL from our Edge Function (works for private agents)
      const session = (await supabase.auth.getSession()).data.session;
      let started = false;
      try {
        const { data, error } = await supabase.functions.invoke('elevenlabs-signed-url', {
          body: { agentId: agentId.trim() },
          headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
        });
        if (!error) {
          const signedUrl = data?.signed_url || data?.url;
          if (signedUrl) {
            await conversation.startSession({ url: signedUrl } as any);
            started = true;
          }
        }
      } catch (e) {
        console.warn('Signed URL request failed, falling back to public Agent ID');
      }

      if (!started) {
        await conversation.startSession({ agentId: agentId.trim() });
      }
    } catch (e: any) {
      console.error(e);
      toast({ title: "Failed to start voice", description: e?.message ?? "", variant: "destructive" });
    } finally {
      setConnecting(false);
    }
  };

  const stop = async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Radio className={`h-4 w-4 ${conversation.status === "connected" ? "text-green-600" : "text-gray-400"}`} />
            <span className="text-sm font-medium">Voice Beta (ElevenLabs)</span>
            {conversation.isSpeaking && (
              <span className="inline-flex items-center text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                <Activity className="h-3 w-3 mr-1" /> Speaking
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">{conversation.status}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <Input
            placeholder="ElevenLabs Agent ID (public)"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={start} disabled={connecting || conversation.status === "connected"} className="bg-purple-600 hover:bg-purple-700 flex-1">
              <Mic className="h-4 w-4 mr-2" /> Start
            </Button>
            <Button variant="outline" onClick={stop} disabled={conversation.status !== "connected"} className="flex-1">
              <MicOff className="h-4 w-4 mr-2" /> Stop
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Note: If your agent is private, we’ll auto-generate a signed URL via a secure Edge Function (uses your ElevenLabs API key stored in Supabase). Public agents work with just the Agent ID.
        </p>
      </CardContent>
    </Card>
  );
};

export default VoiceAgent;
