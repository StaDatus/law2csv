# #StaDatus - law2csv

* A #Visualizar16 project at @medialab-prado by @UAdatos

The aim of the project is to automate the translation from transparency law to a tabular law compliance criterias

* Input: https://www.boe.es url to law in XML format
    * Example for the national transparency law: https://www.boe.es/diario_boe/xml.php?id=BOE-A-2013-12887
* Output:
    * Raw XML data downloaded
    * JSON array with articles divided into sub items { "article": X, "item": Y }
    * CSV with articles divided into sub items, headers "article", "item"

The output could be used as a template to audit transparency portals by adding measure for ever sub item.

The #StaDatus app could provide a crowdsourced platform to upload and list those templates, so the auditors can choose from them to ease transparency portal audits.
