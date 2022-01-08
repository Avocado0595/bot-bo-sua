## Hướng dẫn sử dụng trước khi dùng
- Clone code về
- Máy phải có nodejs nhé
- npm install
- Tạo file .env với các thông số:
```
TOKEN=
CLIENT_ID=
GUILD_ID=
MONGODB=
```
- Điều chỉnh các thông số tùy thích trong config.js
- Muốn sử dụng splash command trong deploy-command thì phải chạy: ```node deploy-commands.js```
- run bot:  npm start


### Một vài thông số trong bot
- Thời gian cooldown sau khi vắt sữa là: 30 phút
- Mỗi giờ bò sẽ giảm: 0.59% sức mạnh
- Mỗi lần ăn cỏ bò sẽ tăng: 4-6% sức mạnh
- Thời gian cooldown khi cho ăn là: 30s
- Mỗi lần vắt sữa sẽ được: 2-4 lít sữa
- Mỗi ngày vắt được tối đa: 16 lít sữa
- Bò có dưới 50% sức mạnh sẽ không vắt được sữa
- 