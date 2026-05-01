# Renocheck — Supabase setup

Wat je 1x moet doen voordat het partnerportaal werkt.

## 1. Database initialiseren

1. Open je Supabase project → **SQL Editor** → **New query**
2. Kopieer de volledige inhoud van `supabase/setup.sql` in de editor
3. Klik **Run** — je krijgt geen output (succes)

Dit creëert de tabellen `profiles`, `blog_posts`, `events`, alle RLS policies en de trigger die automatisch een profielrij aanmaakt bij elke nieuwe gebruiker.

## 2. Site URL + Redirect URLs instellen

In **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (voor dev) — vervang door je echte domein in productie
- **Redirect URLs**: voeg toe:
  - `http://localhost:3000/auth/callback`
  - In productie ook: `https://jouw-domein.be/auth/callback`

Zonder dit blijven invitatie-mails redirecten naar de Supabase-default URL.

## 3. Eerste admin aanmaken

Er is geen self-signup pagina (alleen admins kunnen partners uitnodigen). Dus de eerste admin moet handmatig aangemaakt worden:

**Via Supabase dashboard:**

1. **Authentication → Users → Add user → Create new user**
2. Vul e-mail + wachtwoord in. Vink "Auto Confirm User" aan
3. Ga naar **SQL Editor** en run:
   ```sql
   UPDATE public.profiles
   SET role = 'admin', full_name = 'Jouw naam'
   WHERE id = (SELECT id FROM auth.users WHERE email = 'jouw@email.be');
   ```

Vanaf nu kan je inloggen op `/login` en via `/dashboard/beheer` andere partners uitnodigen.

## 4. Nieuwe partners uitnodigen

Als admin: ga naar `/dashboard/beheer` → **Nieuwe partner uitnodigen**.

De partner krijgt een mail met een magic link. Door erop te klikken belandt hij op `/auth/callback` → dashboard. Bij de eerste login wordt zijn account aangemaakt (de trigger uit setup.sql vult automatisch zijn profiel met de info die je in het uitnodigingsformulier invulde).

## Troubleshooting

- **"profiles" table not found** — Stap 1 nog niet uitgevoerd.
- **Uitnodigingslink werkt niet / redirect ongeldig** — Stap 2: redirect URL ontbreekt.
- **Dashboard toont geen profielnaam** — Trigger heeft geen profiel aangemaakt. Run handmatig:
  ```sql
  INSERT INTO public.profiles (id) VALUES ('<user-uuid>')
  ON CONFLICT DO NOTHING;
  ```
