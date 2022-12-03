from zipfile import ZipFile, ZIP_DEFLATED
from glob import glob
import os
import stat

distDir = './dist/pokemon-browser/'
outDir = distDir + 'zips/'

try:
  os.mkdir(outDir)
except:
 print('zips already exists')

# Do mac stuff :/
os.rename(distDir + 'pokemon-browser-mac_x64', distDir + 'pokemon-browser-mac_x64.app')
os.chmod(distDir + 'pokemon-browser-mac_x64.app', stat.S_IXOTH)

files = glob(distDir + 'pokemon-browser-*')

for file in files:
  fileName = file.split('\\')[-1]
  zipFile = ZipFile(outDir + fileName.split('.')[0] + '.zip', 'w', ZIP_DEFLATED)
  
  zipFile.write(file, fileName)
  zipFile.write(distDir + 'resources.neu', 'resources.neu')
  
  if(fileName.endswith('.exe')):
    zipFile.write(distDir + 'WebView2Loader.dll', 'WebView2Loader.dll')
  
  zipFile.close()