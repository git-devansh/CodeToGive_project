module.exports = (props) => {
  const today = new Date();

  return `
    <!doctype html>
    <html>
        <head></head>
        <body>
        <h2>Hello ${props}</h2>
        </body>
    </html>
    `;
};
