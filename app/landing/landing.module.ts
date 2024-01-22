import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './landing.component';
import { UniquesComponent } from './components/uniques/uniques.component';
import { TdcComponent } from './components/tdc/tdc.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CommentsComponent } from './components/comments/comments.component';
import { WeareComponent } from './components/weare/weare.component';
import { TeamComponent } from './components/team/team.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MaturityComponent } from './components/maturity/maturity.component';
import { TestMaturityComponent } from './components/test-maturity/test-maturity.component';
import { ShowLevelMaturityComponent } from './components/show-level-maturity/show-level-maturity.component';

@NgModule({
    declarations: [
        HomeComponent,
        LandingComponent,
        UniquesComponent,
        TdcComponent,
        CustomersComponent,
        CommentsComponent,
        WeareComponent,
        TeamComponent,
        ProjectsComponent,
        ContactComponent,
        FooterComponent,
        SidenavComponent,
        ScheduleComponent,
        MaturityComponent,
        TestMaturityComponent,
        ShowLevelMaturityComponent,
    ],
    imports: [CommonModule, LandingRoutingModule, MaterialModule],
})
export class LandingModule {}
