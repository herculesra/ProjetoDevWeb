-- update de uma coluna
UPDATE gift_card SET qtd_vendido = 2 WHERE gift_card.codigo = 2

-- Update de um card
UPDATE gift_card
SET	nome="Red Dead Redemption"
WHERE "codigo" = 1 ;

-- ordenando pelos mais vendidos 
SELECT * FROM gift_card  ORDER BY qtd_vendido DESC