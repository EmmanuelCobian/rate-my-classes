import time
import json
from selenium import webdriver 
from selenium.webdriver import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

departments = ['math', 'data', 'eecs', 'compsci', 'physics']
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
    file_path = 'class-scrapper/' + website_path + "_scraping_results.json"
    data = None
    with open(file_path, 'r') as file:
        data = json.load(file)
    driver.find_element(By.XPATH, '/html/body/div[2]/div[2]/main/div/div/div/div[1]/button[1]').click()
    '/html/body/div[2]/div[2]/main/div/div[2]/div/div[1]/button[1]'
    time.sleep(1)

    classes = driver.find_elements(By.CLASS_NAME, 'courseblock')
    for i, cls in enumerate(classes):
        classCode = cls.find_element(By.XPATH, './/button/h3/span[1]').text
        classTitle = cls.find_element(By.XPATH, './/button/h3/span[2]').text
        classUnits = cls.find_element(By.XPATH, './/button/h3/span[3]').text
        classDesc = cls.find_element(By.XPATH, './/div/p').text.split('\n')[-1]
        classPreReq = cls.find_element(By.XPATH, './/div/div/div[1]/p[2]').text
        prefix = 'Prerequisites: '
        if not classPreReq.startswith(prefix):
            try:
                classPreReq = cls.find_element(By.XPATH, './/div/div/div[2]/p[2]').text
                classPreReq = 'N/A' if not classPreReq.startswith(prefix) else classPreReq[len(prefix):]
            except:
                classPreReq = "N/A"
        else:
            classPreReq = classPreReq[len(prefix):]

        # resultObj[classCode] = {"Title": classTitle, "Units": classUnits, "Description": classDesc, 'Prerequisites': classPreReq}
        if classCode in data:
            data[classCode]['Prerequisites'] = classPreReq
        else:
            print('key not found', classCode)

    driver.quit()
    with open(file_path, 'w') as file:
        json.dump(data, file)
