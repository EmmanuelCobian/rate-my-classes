import time
import json
from selenium import webdriver 
from selenium.webdriver import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

departments = ['math', 'compsci', 'eecs', 'data', 'physics']
for website_path in departments:
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument("--window-size=782,900") 
    options.add_argument("start-maximized")

    driver = webdriver.Chrome(
        options=options, 
    )
    print('currently scraping:', website_path)
    driver.get('https://guide.berkeley.edu/courses/' + website_path + '/')


    resultObj = dict()
    driver.find_element(By.XPATH, '/html/body/div[2]/div[2]/main/div/div/div/div[1]/button[1]').click()
    '/html/body/div[2]/div[2]/main/div/div[2]/div/div[1]/button[1]'
    time.sleep(1)

    classes = driver.find_elements(By.CLASS_NAME, 'courseblock')
    for i, cls in enumerate(classes):
        classCode = cls.find_element(By.XPATH, './/button/h3/span[1]')
        classTitle = cls.find_element(By.XPATH, './/button/h3/span[2]')
        classUnits = cls.find_element(By.XPATH, './/button/h3/span[3]')
        classDesc = cls.find_element(By.XPATH, './/div/p')
        resultObj[classCode.text] = {"Title": classTitle.text, "Units": classUnits.text, "Description": classDesc.text.split('\n')[-1]}

    driver.quit()
    file_path = website_path + "_scraping_results.json"
    with open(file_path, 'w') as file:
        json.dump(resultObj, file)
