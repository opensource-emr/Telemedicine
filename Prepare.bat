git clone https://github.com/opensource-emr/telemedicine
cd telemedicine
cd fewatelemedicine
cd clientapp
call npm.cmd install
call ng build --deploy-url=/ClientApp/
cd..
call dotnet tool install --global dotnet-ef
call dotnet ef migrations remove
call dotnet ef migrations add initial
call dotnet ef database update
