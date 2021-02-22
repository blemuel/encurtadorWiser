# encurtadorWiser
Challenge Encurtador - Backend


Requisitos:

- Docker instalado e iniciado na máquina. - _Disponível em: https://www.docker.com/_


Processo de inicialização:
- Executar o seguinte comando no terminal dentro da pasta do projeto: _docker-compose up -d_


Endereços de acesso:
- API: _http://localhost:8081/_
- Documentação Swagger: _http://localhost:8080/_


Funcionamento:
- Para encurtar uma Url, enviar um JSON com o campo _url_ para _http://localhost:8081/encurtador/_. A API responderá com um JSON com o campo _newUrl_ contendo a Url encurtada.
- Ao fazer uma requição à uma Url encurtada (ex.: http://localhost:8081/Abf125ad), o usuário será redirecionado para o Url original armazenada no banco, caso exista, caso não, será redicionado para uma página de erro404.
- Ao encurtar um Url, a Url encurtada terá uma validade de *7 dias*.
- Maiores detalhes estão disponíveis na documentação.
