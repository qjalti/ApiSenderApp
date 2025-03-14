# EXPO & React Native

## Quick start

### Ready

```bash
npm install -g expo-cli
```

```bash
expo init ApiSenderApp
```

```bash
cd ApiSenderApp
```

### Develop

```bash
npx expo start
```

### Build

```bash
npm install -g eas-cli
```

```bash
eas login
```

```bash
eas build --platform android
```

```bash
cd bundletool
```

Изменить в строке ниже значения
- --output
- --bundle

```bash
java -jar bundletool-all-1.18.1.jar build-apks --bundle=FILENAME.aab --output=FILENAME.apks --mode=universal --ks=my-upload-key.keystore --ks-key-alias=my-key-alias --ks-pass=pass:FJHbJObir2# --key-pass=pass:FJHbJObir2#
```

### Рекомендации

Файлы с расширением .apks можно установить при помощи [SAI](https://github.com/Aefyr/SAI)