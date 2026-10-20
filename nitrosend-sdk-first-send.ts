import { Nitrosend } from '@nitrosend/sdk';

const key = process.env.NITROSEND_API_KEY;
if (!key) throw new Error('NITROSEND_API_KEY is not set');

const ns = new Nitrosend(key);

async function main(): Promise<void> {
  const msg = await ns.messages.send(
    {
      channel: 'email',
      to: 'proof@dogfood.nitrosend.net',
      subject: 'First send with the Nitrosend TypeScript SDK',
      body:
        'This is my first send with @nitrosend/sdk 0.11.6, made from a ' +
        '27-line TypeScript file. Runtime Node v22.23.1, compiled with ' +
        'tsc --strict, sent from a free-plan account with a hosted sender.',
    },
    `sdk-first-send-${Date.now()}`,
  );
  console.log('id:', msg.id, 'status:', msg.status, 'to:', msg.to);
}

main().catch((err: unknown) => {
  console.error('send failed:', err);
  process.exitCode = 1;
});
