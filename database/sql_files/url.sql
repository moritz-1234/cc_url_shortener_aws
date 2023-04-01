create table url(
    short_url_id serial primary key,
    short_url text unique,
    long_url text
)