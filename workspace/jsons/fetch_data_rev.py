from util.connect_src import *
import ujson
import pprint
import sys

cursor = initiate_compustat()

cursor.execute("select * from r_naiccd")
naics_name_tab = cursor.fetchall()
naics_name = {}
for r in naics_name_tab:
	naics_name[r[0]] = r[1]

#get all the gvkeys of companies located in the US, gvkeys are the unique identifiers for companies
usa_query = "select a.gvkey from company a, co_afnd2 b where a.gvkey = b.gvkey and year(datadate) in (1995, 2005,2015) and revt is not null and revt > 0 and loc = 'USA' and state = 'NY'"
companies = []

#get company and their naics_codes
cursor.execute("select conm, naics from company where naics is not null and len(naics) = 6 and gvkey in ({})".format(usa_query))
table = cursor.fetchall()
naics_conm = {}
conm_naics = {}
for row in table:
	c = row[0]
	n = row[1]
	companies.append(c)
	conm_naics[c] = n
	if n not in naics_conm:
		naics_conm[n] = []
		naics_conm[n].append(c)
	else:
		naics_conm[n].append(c)

print len(companies)

#get company and their revenue
cursor.execute("select conm, revt, year(datadate) from co_afnd2 a,company b where year(datadate) in (1995, 2005,2015) and naics is not null and len(naics) = 6 and revt is not null and revt > 0 and a.gvkey = b.gvkey and a.gvkey in ({})".format(usa_query))
revenue_table = cursor.fetchall()
print "data pull complete"
date_com_revenue = {}
for row in revenue_table:
	c = row[0]
	rev = row[1]
	d = row[2]
	if d not in date_com_revenue:
		date_com_revenue[d] = {}
		date_com_revenue[d][c] = rev
	else:
		date_com_revenue[d][c] = rev

dates = list(set(date_com_revenue.keys()))
unique_6 = list(set(naics_conm.keys()))
unique_4 = list(set(k[:4] for k in naics_conm.keys()))
unique_5 = list(set(k[:5] for k in naics_conm.keys()))
n6_dict = {}

for n6 in unique_6:
	if n6 in naics_name:
		n6_dict[n6] = {}
		for d in dates:
			n6_dict[n6][d] = {}
			n6_dict[n6][d]["name"] = naics_name[n6]
			n6_dict[n6][d]["children"] = []
n5_dict = {}
for n5 in unique_5:
	if n5 in naics_name:
		n5_dict[n5] = {}
		for d in dates:
			n5_dict[n5][d] = {}
			n5_dict[n5][d]["name"] = naics_name[n5]
			n5_dict[n5][d]["children"] = []
n4_dict = {}
for n4 in unique_4:
	if n4 in naics_name:
		n4_dict[n4] = {}
		for d in dates:
			n4_dict[n4][d] = {}
			n4_dict[n4][d]["name"] = naics_name[n4]
			n4_dict[n4][d]["children"] = []

naics_level_company_rev = {}

for d in dates:
	naics_level_company_rev[d] = {}
	naics_level_company_rev[d]["name"] = "root"
	naics_level_company_rev[d]["children"] = []

	for co in companies:
		co_dict = {}
		co_dict["name"] = co
		if co in date_com_revenue[d]:
			co_dict["size"] = date_com_revenue[d][co]
		else:
			co_dict["size"] = 0

		target_naics = conm_naics[co]
		if target_naics in n6_dict:
			target_6 = n6_dict[target_naics][d]
			target_6["children"].append(co_dict)
		
		if target_naics[:5] in n5_dict:
			target_5 = n5_dict[target_naics[:5]][d]
			if target_6 not in target_5["children"]:
				target_5["children"].append(target_6)
		
		if target_naics[:4] in n4_dict: 
			target_4 = n4_dict[target_naics[:4]][d]
			if target_5 not in target_4["children"]:
				target_4["children"].append(target_5)
	
	for n4 in n4_dict:
		naics_level_company_rev[d]["children"].append(n4_dict[n4][d])				

with open("rev_nest.json","wb") as outf:
	ujson.dump(naics_level_company_rev,outf)
