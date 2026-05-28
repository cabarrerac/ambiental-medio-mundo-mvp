# Supabase

Proyecto creado para el MVP:

- Project ref: `gnrxaxpwkscfwbuskekb`
- URL pública: `https://gnrxaxpwkscfwbuskekb.supabase.co`

La llave `anon`/publishable se usa en el frontend porque Supabase la considera pública y debe combinarse con Row Level Security. No se debe guardar la llave `service_role` ni tokens personales en el repositorio.

La migración inicial vive en `supabase/migrations/20260528162000_initial_mvp_schema.sql`.
