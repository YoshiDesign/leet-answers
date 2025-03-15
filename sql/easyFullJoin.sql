SELECT p1.firstname, p1.lastname, a2.city, a2.state 
from Person p1 
FULL JOIN Address a2 ON a2.personId=p1.personId 
WHERE p1.firstname IS NOT NULL ;
