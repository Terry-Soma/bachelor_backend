select *
from school s
inner join hutulbur h
on h.schoolId = s.Id
inner join mergejil m
on m.hutulburId = h.Id
inner join mergejil_shalguur ms
on ms.MergejilId = m.Id
inner join shalguur_medeelel sm
on m.ShalguurId = ms.


DROP VIEW IF EXISTS `allinfo`;
---1
select `s`.`name` AS `s_name`,
`h`.`name` AS `h_name`,`m`.`name` AS `m_name`,
`m`.`mergeshil` AS `mergeshil`,
`h`.`bosgo_onoo` AS `bosgo_onoo`,
`m1`.`MergejilId` AS `MergejilId`,
`m1`.`shalguuriin_turul` AS `shalguuriin_turul`,
(select group_concat(`s1`.`name` separator ',')) AS `shalgalt` 
from ((((`school` `s` join `hutulbur` `h` on((`s`.`Id` = `h`.`schoolId`))) join `mergejil` `m` on((`h`.`Id` = `m`.`hutulburId`))) join `mergejil_shalguur` `m1` on((`m1`.`MergejilId` = `m`.`Id`))) join `shalguur_medeelel` `s1` on((`m1`.`ShalguurId` = `s1`.`Id`))) group by `m`.`Id`,`m1`.`shalguuriin_turul`;



---3 
 select `s`.`name` AS `s_name`,
  `h`.`name` AS `h_name`,`m`.`name` AS `m_name`,`m`.`mergeshil` AS `mergeshil`,
  `h`.`bosgo_onoo` AS `bosgo_onoo`,`m1`.`MergejilId` AS `MergejilId`,
  `m1`.`shalguuriin_turul` AS `shalguuriin_turul`,
  (select group_concat(`s1`.`name` separator ',')) AS `shalgalt`
  from
  ((((`school` `s` join `hutulbur` `h`
   on((`s`.`Id` = `h`.`schoolId`)))
   join `mergejil` `m`
   on((`h`.`Id` = `m`.`hutulburId`)))
   join `mergejil_shalguur` `m1`
   on((`m1`.`MergejilId` = `m`.`Id`)))
   join `shalguur_medeelel` `s1`
    on((`m1`.`ShalguurId` = `s1`.`Id`)))
    group by `m`.`Id`,`m1`.`shalguuriin_turul`;







---2 

 select `h`.`name` AS `h_name`,`m`.`name` AS `m_name`,
  `h`.`bosgo_onoo` AS `bosgo_onoo`,`m1`.`MergejilId` AS `MergejilId`,
  `m1`.`shalguuriin_turul` AS `shalguuriin_turul`,
  (select group_concat(`s1`.`name` separator ',')) AS `shalgalt`
  from
  ((((`school` `s` join `hutulbur` `h`
   on((`s`.`Id` = `h`.`schoolId`)))
   join `mergejil` `m`
   on((`h`.`Id` = `m`.`hutulburId`)))
   join `mergejil_shalguur` `m1`
   on((`m1`.`MergejilId` = `m`.`Id`)))
   join `shalguur_medeelel` `s1`
    on((`m1`.`ShalguurId` = `s1`.`Id`)))
    group by
     `m`.`Id`,`m1`.`shalguuriin_turul`;