import { CheckCircle2, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { GRADIENT_PILL_CLASS, GRADIENT_PILL_STYLE } from './ContactButton';
import { useLang } from '../i18n';

// Web3Forms forwards each submission to Fadly's email. The access key only allows sending to
// that inbox, so it is safe to ship in the page. While it is empty the form is not shown.
export const WEB3FORMS_ACCESS_KEY = '';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD_CLASS =
  'w-full rounded-2xl border-2 border-[#0C0C0C]/15 bg-transparent px-5 py-4 font-light text-[#0C0C0C] placeholder:text-[#0C0C0C]/40 transition-colors duration-200 focus:border-[#B600A8] focus:outline-none';

export default function ContactForm() {
  const { t } = useLang();
  const copy = t.contact.form;
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${data.get('name')}`,
          from_name: 'fadlyalfarizy.my.id',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          botcheck: data.has('botcheck'),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? 'Send failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <p role="status" className="flex items-center justify-center gap-3 text-center font-medium text-[#0C0C0C]">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-[#B600A8]" aria-hidden="true" />
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot: hidden from people, but bots fill it in and Web3Forms then drops the message. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-name">{copy.name}</label>
        <input id="contact-name" name="name" required maxLength={100} placeholder={copy.name} className={FIELD_CLASS} />
        <label className="sr-only" htmlFor="contact-email">{copy.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder={copy.email}
          className={FIELD_CLASS}
        />
      </div>
      <label className="sr-only" htmlFor="contact-message">{copy.message}</label>
      <textarea
        id="contact-message"
        name="message"
        required
        minLength={5}
        maxLength={3000}
        rows={5}
        placeholder={copy.message}
        className={`${FIELD_CLASS} resize-y`}
      />
      {status === 'error' && (
        <p role="alert" className="text-sm text-[#C0262D]">
          {copy.error}
        </p>
      )}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`${GRADIENT_PILL_CLASS} inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-70`}
          style={GRADIENT_PILL_STYLE}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === 'sending' ? copy.sending : copy.send}
        </button>
      </div>
    </form>
  );
}
