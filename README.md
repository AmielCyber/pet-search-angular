# Pet Search Angular
A website to search available pets for adaption within a given zip code. 
Users can enter a zipcode or have their browser locate them. 

Website was made with Angular v18 and ASP.NET Web Api v8. Angular application hosted at Vercel and ASP.NET Web API hosted at
Microsoft Azure.

[Pet Search ASP.NET Application GitHub Repository](https://github.com/AmielCyber/PetSearch)

## Live Demo
**Note:**
Pet list or zipcode retrieval may take around 10 seconds during a
[cold start](https://azure.microsoft.com/en-us/blog/understanding-serverless-cold-start/cold) when the server is
reactivated after 10 minutes of inactivity. I'm considering upgrading the server to 'always on' on Microsoft Azure in
the future.

[Angular Application Live Demo](https://pet-search-angular.vercel.app)

[ASP.NET Swagger UI](https://pet-search.azurewebsites.net/swagger/index.html)

## Preview
![Desktop Preview](/assets/desktop-preview.gif)

![Mobile Preview](/assets/mobile-preview.gif)

## Technology Stack

### Frontend Application
<div style="display: flex; flex-wrap: wrap; gap: 5px">
    <img alt="Angular" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"/>
    <img alt="TypeScript" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"/>
    <img alt="Jasmine" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jasmine/jasmine-original.svg"/>
    <img alt="HTML" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"/>
    <img alt="CSS" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"/>
</div>

* [Angular](https://angular.dev)
* Tested with [jasmine](https://jasmine.github.io)
* [Angular Material](https://material.angular.io)
* [Vercel Deployment](https://vercel.com)

### Backend Application
<div style="display: flex; flex-wrap: wrap; gap: 5px">
    <img alt="C Sharp" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"/>
    <img alt="Dotnet Core" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"/>
    <img alt="Azure" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"/>
    <img alt="MySQL" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"/>
</div>

* C# and [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) Web API
* Tested with Xunit
* [Microsoft Azure Web App Deployment](https://azure.microsoft.com/en-us/products/app-service/web)
* MySQL
* [OpenApi/Swagger](https://www.openapis.org)
* [PetFinder API](https://www.petfinder.com/developers/v2/docs/)
* [MapBox Geolocation API](https://www.mapbox.com)

## Local Development Set Up

### Required Dependencies

* [Node.js](https://nodejs.org/en)
* [Angular CLI](https://angular.dev/tools/cli)


### Running the Production Build
1. Clone this repository:
  ```bash
  git clone https://github.com/AmielCyber/pet-search-angular
  ```
2. After cloning this repository, go to the repository directory:
```bash
cd pet-search-angular
```

#### ASP.NET Setup
Instructions can be found in the repository for the ASP.NET application:
https://github.com/AmielCyber/PetSearch

### Running in Development

#### Setup Angular

1. Go to the frontend application or the Angular project:
```bash
cd pet-search-angular
```
2. Install npm dependencies:
```bash
npm install
```
3. Test the application:
 Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
```bash
ng test
```
4. Build the application:
 Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```bash
ng build
```

#### Configure Angular
1. Go to the Angular application directory:
```bash
cd /pet-search-angular
```
2. Change the port inside the file: `src/environments/environment.development.ts` to the port that **your** ASP.NET application is using or your
   server of your choice.

#### Run the Angular Application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
```bash
ng serve
```
