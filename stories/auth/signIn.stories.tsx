import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor, useCallback, useState } from 'react';
import { Field, Form, FormContext, FormFields, FormState } from '@cezembre/forms';
import { FridayClient, useActiveSession, useClubs, useSignIn } from '../../src';

interface Credentials extends FormFields {
  email?: string;
  password?: string;
}

interface Props {}

export default {
  title: 'Auth/SignIn',
} as ComponentMeta<JSXElementConstructor<Props>>;

function App() {
  const [formState, setFormState] = useState<FormState<Credentials>>();

  const form = useCallback((formContext: FormContext<Credentials> | null) => {
    setFormState(formContext?.formState);
  }, []);

  const session = useActiveSession();
  const signIn = useSignIn();

  const submit = useCallback(async (credentials: Credentials) => {
    await signIn.mutateAsync(credentials);
  }, []);

  return (
    <div>
      Status : {session.data ? 'Connecté' : 'Non connecté'}
      {session.data ? <p>Session: {session.data.id}</p> : null}
      {session.error ? <p>Session error: {(session.error as Error).message}</p> : null}
      <Form<Credentials> ref={form} className="auth-sessions-sign-in" onSubmit={submit}>
        <h1>Connection</h1>

        <Field name="email" type="email" label="Email" />

        <Field name="password" type="password" label="Mot de passe" />

        <button type="submit">Me connecter</button>

        {formState?.error ? <span>{formState.error}</span> : null}
        {formState?.warning ? <span>{formState.warning}</span> : null}
      </Form>
    </div>
  );
}

const Template: ComponentStory<JSXElementConstructor<Props>> = ({}: Props) => (
  <FridayClient host="http://localhost:4200" apiKey="pk_aXJeQNWOzfe8IsHyzGtN93nzrEFmBFmF9gIakI3W">
    <App />
  </FridayClient>
);

export const Default = Template.bind({});

Default.args = {};
