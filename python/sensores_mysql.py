from time import gmtime, strftime #para poder dar formato a la hora
from serial import Serial
from pymysql import connect

#Inicializar la libreria de serial
ser = Serial('/dev/ttyACM0', 9600, timeout=1)#datos del puerto del arduino, estos pueden variar

db = connect(
  host="",
  user="",
  password="",
  database=""
)

cursor = db.cursor()

while True:
    try:
        dato = str(ser.readline())
        if dato != "":
            dia = strftime("%d-%m-%Y", gmtime())
            hora = strftime("%H", gmtime())
            minuto = strftime("%M", gmtime())
            segundo = strftime("%S", gmtime())
            hora_completa = "{}:{}:{}".format(hora,minuto,segundo)
            print(hora_completa + " -> LDR:" + dato)
            if hora in [ str(h) if h>=10 else "0"+str(h) for h in range(0,24,4) ] and minuto == "00" and segundo == "00":
                print("Hora de subir los datos!")
                if hora == "00":
                    sql = "INSERT INTO `tabla_pagina_web` (`dia`, `dato_ldr`) VALUES ('{}', '00:{}')".format(dia, dato)
                    cursor.execute(sql) # Ejecutar la consulta
                    db.commit()
                else:
                    sql = "SELECT * FROM tabla_pagina_web" # Sintaxis de la consulta:
                    cursor.execute(sql) # Ejecutar la consulta
                    results = cursor.fetchall()[-1] # Guarda el ultimo registro
                    for row in results: #Recorrer la lista para mostrar cada registro
                        id = str(row[0])
                        ldr = str(row[2])
                    
                    sql = "INSERT INTO `tabla_pagina_web` (`dia`, `dato_ldr`) VALUES ('{}', '{}:{}')".format(dia, hora, dato)
                    cursor.execute(sql) # Ejecutar la consulta
                    db.commit()

    except:#Guardar los cambios en caso de un error o desconectar el Arduino
        print("ERROR!")
        print("Seguramente se haya desenchufado la placa!")
        break

print("Fin del programa...")