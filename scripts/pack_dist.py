from zipfile import ZipFile
from glob import glob
import os

dist_dir = './dist/pokemon-browser/'
out_dir = dist_dir + 'zips/'

os.mkdir(out_dir)

files = glob(dist_dir + 'pokemon-browser-*')

for file in files:
  zipFile = ZipFile(out_dir + file.split('\\')[-1].split('.')[0] + '.zip', 'w')
  
  zipFile.write(file)
  zipFile.write(dist_dir + 'resources.neu')
  
  zipFile.close()