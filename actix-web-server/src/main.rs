use actix_web::{App, HttpResponse, HttpServer, guard, web};
use std::io;

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .service(
                web::scope("/")
                    // If the request's Host header is www.rust-lang.org, it is routed to the handler.
                    // other example: guard::Get()
                    .guard(guard::Host("www.rust-lang.org"))
                    .route("", web::to(|| async { HttpResponse::Ok().body("www") })),
            )
            .service(
                web::scope("/")
                    .guard(guard::Host("users.rust-lang.org"))
                    .route("", web::to(|| async { HttpResponse::Ok().body("user") })),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
