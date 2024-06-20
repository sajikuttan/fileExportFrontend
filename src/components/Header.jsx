import React from 'react';
import ImportButton from './ImportButton';
import ExportButton from './ExportButton';
import ViewChart from './ViewChart';
import { Grid, GridColumn } from 'semantic-ui-react';

function Header() {
    return (
        <>
            <Grid>
                <GridColumn width={2}>
                    <ImportButton />
                </GridColumn>
                <GridColumn width={2}>
                    <ExportButton />
                </GridColumn>
                <GridColumn width={2}>
                    <ViewChart />
                </GridColumn>
            </Grid>
        </>
    );

}

export default Header;
