#need to install package 'websockets' (pip install websockets)
import asyncio
import websockets
import tkinter as tk
from threading import Thread

clients = set()

async def register(websocket):
    clients.add(websocket)
    await notify_clients(f"New client connected: {len(clients)} clients total")

async def unregister(websocket):
    clients.remove(websocket)
    await notify_clients(f"Client disconnected: {len(clients)} clients total")

async def notify_clients(message):
    if clients:
        await asyncio.wait([asyncio.create_task(client.send(message)) for client in clients])

async def echo(websocket, path):
    await register(websocket)
    try:
        async for message in websocket:
            await notify_clients(message)
            server_gui.display_message(f"Client: {message}")
    finally:
        await unregister(websocket)

def start_server(loop):
    asyncio.set_event_loop(loop)
    start_server = websockets.serve(echo, "0.0.0.0", 8765)
    loop.run_until_complete(start_server)
    print("WebSocket server started on ws://localhost:8765")
    loop.run_forever()

class ServerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("WebSocket server started on ws://localhost:8765")

        self.messages = tk.Text(root)
        self.messages.pack()

        self.input_user = tk.StringVar()
        self.input_field = tk.Entry(root, text=self.input_user)
        self.input_field.pack(side=tk.BOTTOM, fill=tk.X)

        self.input_field.bind("<Return>", self.send_message)

    def display_message(self, message):
        self.messages.insert(tk.END, f"{message}\n")

    def send_message(self, event):
        message = self.input_user.get()
        self.input_user.set("")
        asyncio.run_coroutine_threadsafe(self.send_to_clients(message), loop)
        self.display_message(f"Server: {message}")

    async def send_to_clients(self, message):
        await notify_clients(message)

def start_gui():
    root = tk.Tk()
    global server_gui
    server_gui = ServerGUI(root)
    root.mainloop()
    loop.call_soon_threadsafe(loop.stop)

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    
    # Start the WebSocket server in a separate thread
    server_thread = Thread(target=start_server, args=(loop,))
    server_thread.start()

    # Start the GUI in the main thread
    start_gui()

    # Ensure the server thread stops when the GUI is closed
    server_thread.join()
