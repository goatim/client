import { useCallback, useState } from 'react';
import { Field, Form, FormContext, FormState } from '@cezembre/forms';
import { GoatimClient, useActiveSession, useSignIn, useSignOut } from '../../src';

interface Credentials {
  email: string;
  password: string;
}

export default {
  title: 'Auth/SignIn',
};

function App() {
  const [formState, setFormState] = useState<FormState<Credentials>>();

  const form = useCallback((formContext: FormContext<Credentials> | null) => {
    setFormState(formContext?.formState);
  }, []);

  const session = useActiveSession();
  const signIn = useSignIn();
  const signOut = useSignOut();

  const submit = useCallback(
    async (credentials: Credentials) => {
      if (!credentials.email || !credentials.password) {
        return;
      }
      await signIn.mutateAsync(credentials);
    },
    [signIn],
  );

  return (
    <div>
      Status : {session.data ? 'Connecté' : 'Non connecté'}
      {session.data ? <p>Session: {session.data.id}</p> : null}
      {session.error ? <p>Session error: {(session.error as Error).message}</p> : null}
      <Form<Credentials> ref={form} className="auth-sessions-sign-in" onSubmit={submit}>
        <h1>Connection</h1>

        <Field name="email" type="email" />

        <Field name="password" type="password" />

        <button type="submit">Me connecter</button>

        {formState?.error ? <span>{formState.error}</span> : null}
        {formState?.warning ? <span>{formState.warning}</span> : null}
      </Form>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

function Template() {
  return (
    <GoatimClient host="http://localhost:4200" apiKey="pk_aXJeQNWOzfe8IsHyzGtN93nzrEFmBFmF9gIakI3W">
      <App />
    </GoatimClient>
  );
}

export const Default = Template.bind({});
