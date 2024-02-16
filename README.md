##Setup do projeto

###Requisitos
* Visual Studio Code
* Extensão Dev Containers
* Docker e Docker Compose

### Passo a passo
Seguir o passo a passo dentro do diretório do projeto

* chmod +x .docker/start.sh 
* cp .env.example .env
* Abra o projeto pelo vs code
* Dentro do vs code aperte CTRL + SHIFT + P e digite "Dev Containers: Open Folder in Container..."
* npm run migrate
* npm run start:dev