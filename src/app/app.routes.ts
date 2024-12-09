import { Routes } from '@angular/router';
import { JsonEditorComponent } from './json-editor/json-editor.component';


export const routes: Routes = [
    {
        path: "json-editor",
        component: JsonEditorComponent
    },
    {
        path: "**",
        redirectTo: "json-editor"
    }

];
