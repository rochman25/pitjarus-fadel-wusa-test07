
<h4>Soalnya</h4>

1. Test terdiri dari 2 soal,1 soal tambahan, 1 soal bonus
2. Untuk mengerjakan, silahkan fork repository [ini](https://github.com/kneth90/pitjarus-fadel-wusa-test07) branch 'main'  
3. Anda akan dapat mendownload dump mysql di [sini](https://storage2.pitjarus.co/galderma/betest/dump-galderman.sql)  
4. Relasi antar table yang ada sebagai berikut  

![alt text](https://storage2.pitjarus.co/galderma/betest/relasi-table.png "Relasi Table")  

Soal A.  
    - buat sebuah endpoint '/visit' dengan metode post, dengan parameter {visit_id: }  
    - berdasarkan relasi table, tampilkan data sesuai contoh output yg sudah ada  

Soal B  
    - buat sebuah endpoint '/product-visit' dengan metode post, dengan parameter {visit_id: }
    - pada table 'report_display_view' terdapat kolom 'json_path'
    - file json tersebut berisi array of object, dimana setiap object merepresentasikan sebuah product
    - setiap object memiliki properties yg bernama 'object_name'
    - 'object_name' dapat digunakan untuk menentukan 'id' sebuah product pada table 'product' ('object_name' = 'product.label')
    - tampilkan data sesuai contoh yg sudah diberikan

Soal Tambahan  
    1. - buatlah sebuah table bernama 'report_product' yg berbentuk  
    ![alt text](https://storage2.pitjarus.co/galderma/betest/table%20report_product.png "Report Product")  

    2.  - buat sebuah endpoint '/batch' dengan metode post, dengan parameter {visit_id: }  
        - insert data ke table tersebut (data yg diinput sesuai Soal B)  


Soal Bonus:  
    - validasi menggunakan joi/yup  
    - tambahkan swagger-ui  
        