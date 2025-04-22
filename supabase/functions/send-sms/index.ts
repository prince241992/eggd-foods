
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as twilio from 'npm:twilio@4.19.0';

const client = twilio(
  Deno.env.get('TWILIO_ACCOUNT_SID'),
  Deno.env.get('TWILIO_AUTH_TOKEN')
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phone, message } = await req.json();

    const twilioResponse = await client.messages.create({
      body: message,
      to: phone,
      from: Deno.env.get('TWILIO_PHONE_NUMBER'),
    });

    return new Response(
      JSON.stringify({ success: true, messageId: twilioResponse.sid }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
