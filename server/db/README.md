# Database Setup

```sql
CREATE ROLE market_user LOGIN password 'this_is_market_password';
create database market ENCODING 'UTF8' OWNER market_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA information_schema GRANT SELECT ON TABLES TO market_user;
grant all on schema information_schema to market_user;
```