# toolood eremblene
SELECT value, COUNT(*) AS count
FROM eburtgel
GROUP BY value
ORDER BY s.id DESC;


# surguuli bolon too checked
SELECT count(s.id) as too,s.name
FROM eburtgel e
inner join mergejil m
on m.id = e.mergejilId
inner join hutulbur h
on h.id = m.hutulburId
inner join school s
on s.id = h.schoolId
group by s.id
order by too DESC;



#2
select count(burtgel_Id) as niit_elsegch
from elsegch;

#1
select count(id) as niit_mergejil_songolt
from eburtgel;

