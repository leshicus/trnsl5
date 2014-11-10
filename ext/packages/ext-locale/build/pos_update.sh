#!/bin/bash

cd /var/www
rm -rf Office
svn export http://betmill.ru/svn/betmill/trunk/pos/app/build/production/Office/ /var/www/
service apache2 update
