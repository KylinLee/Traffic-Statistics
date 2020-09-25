create database tongji；
use tongji;
create table visitor(
    id char(8),
    name varchar(20),
    visit_time datetime,
    sex tinyint,
    temperature char(4)
);

create table blacklist(
    id char(8),
    name varchar(20)
);