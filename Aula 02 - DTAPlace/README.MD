Desafio RPlace
- Autenticação
- armazenar token 

Fazer uma Matriz 300x300
	- Cada pixel pode tem que ter:
		- owner
		- cor
		- Ultima modificação

Cada pixel so pode ser alterado no mínimo a cada 20 segundos
na tela principal fica amostra de todos os pixels em sequencia,
porem quando um pixel sofre um *hover* ele mostra os dados (owner e ultima modificação)

DATABASE:
user
	int id
	string username
	string password (hash) 
pixel
	int id
	int x
	int y
	string color
	int userId


API:
subscribe
	- username
	- password
login
    - username
	- password
updatePixel