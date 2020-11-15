cls
cd D:\AutomationBuildandRun
# "Step 1 copy the code to my local drive
Write-Output "Step 1 Started cloning..."
git clone https://github.com/opensource-emr/Telemedicine --quiet
Write-Output "Cloning finished..."
Write-Output "Step 2 Change to Angular director..."
cd .\Telemedicine\FewaTelemedicine\ClientApp
Write-Output "Step 3 Start installing angular..."
# this command install angular
npm install
Write-Output "Step Installation of Angular finished"
Write-Output "Step 4 Running ng Build..."
ng build --deploy-url=/ClientApp/
Write-Output "Step  ng Build finished..."

Write-Output "Step 5 Go to the Dotnet CSPROJ..."
cd..
Write-Output "Step 6 Start building..."
dotnet build
Write-Output "Step Finish dotnet build..."

Write-Output "Step 7 Install dotnet tool..."

dotnet tool install --global dotnet-ef
Write-Output "Step  Install dotnet tool finished..."

Write-Output "Step 8 Creating DB..."
& "D:\postgreinstallation\bin\psql.exe" -U postgres -w -d postgres -c " SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'fewatelemedicine'; " | Out-Null
& "D:\postgreinstallation\bin\psql.exe" -U postgres -w -d postgres -c "drop database IF EXISTS  fewatelemedicine;" | Out-Null
& "D:\postgreinstallation\bin\psql.exe" -U postgres -w -d postgres -c "create database fewatelemedicine;" | Out-Null
dotnet ef migrations remove 
dotnet ef migrations add v1 
dotnet ef database update
Write-Output "Step DB Creation finished..."

Write-Output "Step 9 Running the application..."
dotnet build 
dotnet run
start ‘https://localhost:5001’