const MainLayout = ({ children }) => {
  return (
    <body>
      <section className="gradient-custom-2">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12 col-xl-10">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
        integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
        crossOrigin="anonymous"
      ></script>
    </body>
  );
};

export default MainLayout;
