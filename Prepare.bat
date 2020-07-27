git clone https://github.com/opensource-emr/telemedicine
cd telemedicine
cd fewatelemedicine
cd clientapp
call npm.cmd install
call ng build --deploy-url=/ClientApp/
cd..
dotnet tool install --global dotnet-ef
dotnet ef migrations remove
dotnet ef migrations add initial
dotnet ef database update
