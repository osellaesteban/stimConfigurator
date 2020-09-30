#include "BluetoothSerial.h"
#include <ArduinoJson.h>

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

#define JS_DOCUMENT_SIZE 1024;

#define N_CHANNELS 6
#define MAX_CURRENT 1000
#define MAX_PW 1000
#define MAX_FREQ 1000


//int LED_BUILTIN = 2;

struct stimchannel_st {
  unsigned int freq;
  unsigned int pulsewidth;
  unsigned int current;
};

struct patientConf_st {
  unsigned int ID;
  stimchannel_st stimchannel[N_CHANNELS];
};



const size_t capacity = JSON_ARRAY_SIZE(6) + JSON_OBJECT_SIZE(2) + 6*JSON_OBJECT_SIZE(4) + 80;
DynamicJsonDocument docJS(capacity*2);

//const char* json =  deserializeJson(docJS, json);

// const char* PatientID = docJS["PatientID"]; // "30412884"

JsonArray stimConfigs = docJS["stimConfigs"];



BluetoothSerial SerialBT;
// DynamicJsonDocument docJS(JS_DOCUMENT_SIZE);
patientConf_st chConfiguration;
char incomingChar;
bool deserialize = 0;
// char stimarray[] = "{\"ID\":00000000,\"channel\":0,\"Freq\":100,\"PulseWidth\":000000,\"current\":1000}";
String message = "";

DeserializationError error ;

void setup() {
  pinMode (LED_BUILTIN, OUTPUT);

  // bt serial configuration
  Serial.begin(115200);
  SerialBT.begin("Stimulator"); //Bluetooth device name
  for (unsigned int k = 0; k < 3; k++)
  {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000);
  }
  Serial.println("The device started, now you can pair it with bluetooth!");
  Serial.println("Esperando datos ... ");
}
void loop() {
  unsigned int channel = 0;
  if (SerialBT.available()) 
  {
    digitalWrite(LED_BUILTIN, HIGH);
    incomingChar =  (char)SerialBT.read();
    if (incomingChar!= '\n'){
      message += String(incomingChar);
      
    }
    else
    {
      deserialize = 1;
      Serial.println("datos ingresados:");
      Serial.println(message.c_str());
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
  if(deserialize)
  {
    int lg = message.length();//strlen(message);
    //message[lg-2] = '\0';
    error = deserializeJson(docJS, message); // el json lo levanta bien, pero no el mensaje que recibe, y cuando lemanda tampoco  
    //error = deserializeJson(docJS, json);
    if(error)
    {
      Serial.println("Error while deserializing with code");
      Serial.println(error.c_str());
      //Serial.println(message.c_str());
      deserialize = 0;
      error = DeserializationError::Ok;
    }
    else
    {
      SerialBT.print("Datos corrrectamente deserializados\r\n");
      deserialize = 0;
      if(docJS.containsKey("PatientID"))
      {
        chConfiguration.ID = docJS["PatientID"].as<unsigned int>();
        Serial.print("Configurando datos para el paciente ID: ");
        Serial.print(chConfiguration.ID);
        //SerialBT.print("Configurando datos para el paciente ID: ");
        //SerialBT.print(chConfiguration.ID);
        JsonArray stimConfigs_v = docJS["stimConfigs"];
        
        if(stimConfigs_v.size()>0);
        {
          JsonObject stimConfigs = stimConfigs_v[0]; 
          for(unsigned int iter = 0; iter < stimConfigs_v.size();iter++)
          {
            stimConfigs = stimConfigs_v[iter];
            if(stimConfigs["channel"] <= 6)
            {
              channel = stimConfigs["channel"];
              chConfiguration.stimchannel[channel].freq = stimConfigs["frequency"].as<unsigned int>();
              chConfiguration.stimchannel[channel].pulsewidth = stimConfigs["pulsewidth"].as<unsigned int>();
              chConfiguration.stimchannel[channel].current = stimConfigs["current"].as<unsigned int>();
            }
            Serial.print("\nCanal ");
            Serial.print(channel);
            Serial.print("\r\n--> Frecuencia: ");
            Serial.print(chConfiguration.stimchannel[channel].freq);
            Serial.print("\r\n-->PW:" );
            Serial.print(chConfiguration.stimchannel[channel].pulsewidth);
            Serial.print("\r\n-->Corriente:");
            Serial.print(chConfiguration.stimchannel[channel].current);
            Serial.println("\r\n----");
          }
        }
        Serial.println("\n----------------------------------------------------");
      }
      else
      {
        stimchannel_st chann;
        channel = docJS["channel"].as<unsigned int>();
        chann.freq  = docJS["frequency"].as<unsigned int>();
        chann.pulsewidth  = docJS["pulsewidth"].as<unsigned int>();
        chann.current  = docJS["current"].as<unsigned int>();
        Serial.print("\r\nTesteando Canal: ");
        Serial.print(channel);
        Serial.print("\r\n--> Frecuencia: ");
        Serial.print(chann.freq);
        Serial.print("\r\n-->PW:" );
        Serial.print(chann.pulsewidth);
        Serial.print("\r\n-->Corriente:");
        Serial.print(chann.current);
        Serial.println("\r\n----");
      }
    }
    message = "";
  }  
}
