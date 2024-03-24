export async function middleware(request){

    const currentUser = request.cookies.get('userToken')?.value
   
    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher : ['/dashboard']
}   