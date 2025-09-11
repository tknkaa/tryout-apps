use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};
use serde::Serialize;
use std::io;

#[derive(Clone, Debug, Serialize)]
struct ToDo {
    id: u32,
    detail: String,
}

#[get("/todos")]
async fn get_todos(data: web::Data<Vec<ToDo>>) -> impl Responder {
    let todos = data.to_vec();
    println!("{:?}", todos);
    HttpResponse::Ok().json(todos)
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .app_data(web::Data::new(vec![ToDo {
                id: 0,
                detail: String::from("sleep"),
            }]))
            .service(get_todos)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
