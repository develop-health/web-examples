with pat as (
    insert into public.patient (birth_date)
        values
            ('2000-04-30')
        returning _id
),
pat_name as (
    insert into public.human_name (family, given, patient_id)
        select 'Gopal', '["Marques"]', pat._id
        from pat
)
insert into public.contact_point (system, value, patient_id)
select 'email', 'example@example.com', pat._id
from pat;
