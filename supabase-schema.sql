-- Schema pour l'application Evaluation 1/3 stage BUT QLIO
-- Copiez-collez ce SQL dans l'editeur SQL de votre projet Supabase
-- (app.supabase.com > SQL Editor > New query)

create table if not exists campaigns (
  id          text        primary key,
  name        text        not null,
  data        jsonb       not null,
  updated_at  timestamptz not null default now()
);

-- Activer Row Level Security (bonne pratique)
alter table campaigns enable row level security;

-- Politique permissive : toute personne ayant la cle anonyme peut lire et ecrire.
-- Pour restreindre l'acces, supprimez cette politique et ajoutez une authentification Supabase.
create policy "Acces libre avec cle anonyme"
  on campaigns
  for all
  using (true)
  with check (true);
