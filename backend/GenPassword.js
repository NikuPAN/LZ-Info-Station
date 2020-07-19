const bcrypt = require('bcrypt');

let pswrd = 'ABCcan24hsleep';
let passwd = bcrypt.hashSync(pswrd, 12);

console.log(passwd);
// $2y$12$8xGFWTntg438xJMvVwoXze08uW/X/NrPrQLyRyQFUcDy4GPefCjm2
// $2y$12$c9Xen6KaGNCERnxg7ZAPrO05w/Y5rnXy.o/ioD56sacYXi2FaAlTi