### Học sử dụng windown.location để nhảy trang này

### Học sử dụng muler để lưu trữ ảnh ở  file tĩnh phía server

### Học sử dụng path để tạo đường dẫn cho ảnh để phía client có thể truy cập

### Học nhảy trang dựa vào id trên url ntn

app.use(express.static(path.join(__dirname, 'public')));

Lỗi và cách sửa: bổ sung thêm:

```
import path from 'path';
const __dirname = path.resolve();
```

[Đọc thêm tài liệu về path](https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version)

Cách tạo new Form đẻ gửi ảnh về server

```
const data = new FormData();
const extenFile = file.name.split('.');
const filename = 'file' + '-' + Date.now() + '.' + extenFile.pop();
data.append("name", filename);
data.append("file", file);
const res = await axios.post(baseURL + '/upload', data);
newPost.photo = filename;
```
#####
Còn chưa thực hiện xóa các bài viết của user khi xóa đi user.
Còn lỗi khi xóa được bài viết ko phải của mình.//Da fix