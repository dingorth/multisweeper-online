import { Component,OnInit,OnDestroy } from '@angular/core';


export class Room {
    id: number;
    name: string;
    players: Player[];
}
export class Player {
    name: string;
}

@Component({
    selector: 'room',
    template: `
    <div class="container">
        <div class="com-md-12"><h2>Game Room</h2></div>
        <div class="col-md-6">
            <minesweeper></minesweeper>
        </div>
        <div class="col-md-6">
            <div>
                <h4>Lista graczy</h4>
                <ul>
                    <li>Gracz1</li>
                    <li>Gracz2</li>
                    <li>Gracz3</li>
                </ul>
            </div>
            <chat></chat>
            <nav>
                Jakaś nawigacja maybe.
            </nav>
        </div>
    </div>
    `
})
export class RoomComponent implements OnInit,OnDestroy {

    constructor(){

    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }
}