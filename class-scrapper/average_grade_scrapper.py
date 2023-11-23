import time
import json
from selenium import webdriver 
from selenium.webdriver import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

departments = ['math', 'compsci', 'eecs', 'data', 'physics']
for department in departments:
    print('currently scraping ', department, 'department')

    class_data_path = 'class-scrapper/' + department + '_scraping_results.json'
    data = None
    with open(class_data_path, 'r') as file:
        data = json.load(file)

    for course_code in data:
        options = Options()
        options.add_argument('--headless=new')
        driver = webdriver.Chrome(options=options)

        parsing = course_code.split(' ')
        code = parsing[0]
        num = parsing[1]
        url = 'https://berkeleytime.com/catalog/Spring%202024/'+ code.upper() + '/' + num
        print('trying:', url)
        try:
            driver.get(url)
            grade = 'N/A'
            try:
                grade = driver.find_element(By.XPATH, '/html/body/div/div/div/div[3]/div[1]/div[2]/div')
            except:
                print('trying span')
                try:
                    grade = driver.find_element(By.XPATH, '/html/body/div/div/div/div[3]/div[1]/div[2]/div/span')
                except:
                    print('not in div or span')
                    grade = 'N/A'
            data[course_code]['Average Grade'] = grade.text
        except:
            data[course_code]['Average Grade'] = 'N/A'
            print("error", url)

        driver.quit()

    with open('class-scrapper/' + department + '_scraping_results.json', 'w') as file:
        json.dump(data, file)