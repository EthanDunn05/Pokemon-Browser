from zipfile import ZipFile
from glob import glob
import os

distDir = './dist/pokemon-browser/'
outDir = distDir + 'zips/'

os.mkdir(outDir)

files = glob(distDir + 'pokemon-browser-*')

for file in files:
  fileName = file.split('\\')[-1]
  zipFile = ZipFile(outDir + fileName.split('.')[0] + '.zip', 'w')
  
  zipFile.write(file, fileName)
  zipFile.write(distDir + 'resources.neu', 'resources.neu')
  
  if(fileName.endswith('.exe')):
    zipFile.write(distDir + 'WebView2Loader.dll', 'WebView2Loader.dll')
  
  zipFile.close()