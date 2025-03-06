"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { startRegistration } from "@simplewebauthn/browser";

// doesn't matter in this case
const emptyChallenge = "";
const emptyChallengeBase64 = "";

export default function WebAuthRegistrationForm() {
  const [credentialID, setCredentialID] = useState<undefined | string>();
  const [publicKey, setPublicKey] = useState<undefined | string>();

  const registerCrendential = async () => {
    try {
      const registrationOptions = await generateRegistrationOptions({
        attestationType: "none",
        authenticatorSelection: {
          residentKey: "required",
          userVerification: "preferred",
        },

        challenge: emptyChallenge,

        rpName: process.env.NEXT_PUBLIC_RP_NAME,
        rpID:
          process.env.NODE_ENV == "development"
            ? "localhost"
            : process.env.NEXT_PUBLIC_RP_ID,
        userName: process.env.NEXT_PUBLIC_FIXED_NAME,
      });

      console.log(registrationOptions);

      const authenticationResponse = await startRegistration({
        optionsJSON: registrationOptions,
      });

      const verification = await verifyRegistrationResponse({
        response: authenticationResponse,
        expectedChallenge: emptyChallengeBase64,
        expectedOrigin:
          process.env.NODE_ENV == "development"
            ? "http://localhost:3000"
            : `https://${process.env.NEXT_PUBLIC_RP_ID}`,

        requireUserVerification: false,
      });

      const { registrationInfo } = verification;

      if (registrationInfo) {
        setCredentialID(registrationInfo.credential.id);
        setPublicKey(
          JSON.stringify(Array.from(registrationInfo.credential.publicKey)),
        );

        toast("✔️ Done", {
          description: "Save the credential id and public key for your own use",
        });
      } else {
        throw Error;
      }
    } catch {
      toast("😱 Oops", {
        description: "Something went wrong during the registration",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 my-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="credential-id">Credential ID</Label>
        <Textarea
          id="credential-id"
          value={credentialID}
          placeholder="leave it blank"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="public-key">Public Key</Label>
        <Textarea
          id="public-key"
          value={publicKey}
          placeholder="leave it blank"
          className="min-h-[8rem]"
        />
      </div>

      <Button onClick={registerCrendential}>Register</Button>

      <aside className="text-neutral-500 text-xs">
        🧐 Credentials automatically occupy key slots in your credential
        manager. If you no longer need them, delete them!
      </aside>
    </div>
  );
}
