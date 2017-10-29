import xlrd
import json
import csv, sys

csv_file_name = "./withid/mapping.csv"
mapper_reader = csv.reader(open(csv_file_name, 'rU'))

levels_dict = {}

level1_arr =[]
level2_arr =[]
level3_arr =[]
level4_arr =[]
level5_arr =[]
level6_arr =[]

for row_num, row in enumerate(mapper_reader):
	if row_num == 0:
		continue
	if row[2] not in level1_arr:
		level1_arr.append(row[2])
	if row[3] not in level2_arr:
		level2_arr.append(row[3])
	if row[4] not in level3_arr:
		level3_arr.append(row[4])
	if row[5] not in level4_arr:
		level4_arr.append(row[5])
	if row[6] not in level5_arr:
		level5_arr.append(row[6])
	if row[7] not in level6_arr:
		level6_arr.append(row[7])



# print level1_arr
# print level2_arr
# print level3_arr
# print level4_arr
# print level5_arr
# print level6_arr

levels_dict['level1_arr'] = level1_arr
levels_dict['level2_arr'] = level2_arr
levels_dict['level3_arr'] = level3_arr
levels_dict['level4_arr'] = level4_arr
levels_dict['level5_arr'] = level5_arr
levels_dict['level6_arr'] = level6_arr

# print levels_dict

with open('./withid/levels_dict.json', 'w') as outfile:
	json.dump(levels_dict, outfile)



# if __name == "__main__":
